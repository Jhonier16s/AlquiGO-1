import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase clients
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-92179ba9/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-92179ba9/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      email, 
      password, 
      name, 
      lastName,
      phone,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      acceptMarketing
    } = body;

    if (!email || !password || !name || !lastName) {
      return c.json({ error: "Faltan campos requeridos" }, 400);
    }

    const supabase = getSupabaseClient();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: `${name} ${lastName}`,
        phone,
        dateOfBirth,
        gender,
        country,
        city,
        address,
        acceptMarketing
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log('Auth error while creating user:', authError);
      return c.json({ error: authError.message }, 400);
    }

    if (!authData.user) {
      return c.json({ error: "Error al crear usuario" }, 500);
    }

    // Save additional user data to kv_store
    const userData = {
      id: authData.user.id,
      email,
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      phone,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      acceptMarketing,
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${authData.user.id}`, userData);

    return c.json({ 
      success: true, 
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: userData.fullName
      }
    });
  } catch (error) {
    console.log('Error in signup endpoint:', error);
    return c.json({ error: "Error en el servidor al crear usuario" }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-92179ba9/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Email y contraseña son requeridos" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error during sign in:', error);
      return c.json({ error: error.message }, 400);
    }

    if (!data.session || !data.user) {
      return c.json({ error: "Error al iniciar sesión" }, 401);
    }

    // Get additional user data from kv_store
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userData?.fullName || data.user.user_metadata?.name || email.split('@')[0],
        phone: userData?.phone || data.user.user_metadata?.phone
      }
    });
  } catch (error) {
    console.log('Error in signin endpoint:', error);
    return c.json({ error: "Error en el servidor al iniciar sesión" }, 500);
  }
});

// Get user session endpoint
app.get("/make-server-92179ba9/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No se proporcionó token" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log('Error getting user session:', error);
      return c.json({ error: "Sesión inválida" }, 401);
    }

    // Get additional user data from kv_store
    const userData = await kv.get(`user:${user.id}`);

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: userData?.fullName || user.user_metadata?.name || user.email?.split('@')[0],
        phone: userData?.phone || user.user_metadata?.phone
      }
    });
  } catch (error) {
    console.log('Error in session endpoint:', error);
    return c.json({ error: "Error en el servidor al verificar sesión" }, 500);
  }
});

// Create transaction endpoint
app.post("/make-server-92179ba9/transactions", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log('Authorization error while creating transaction:', authError);
      return c.json({ error: "No autorizado" }, 401);
    }

    const body = await c.req.json();
    const { 
      items, 
      total, 
      shippingInfo, 
      paymentInfo,
      transactionType // 'purchase', 'rental', or 'mixed'
    } = body;

    if (!items || !total || !shippingInfo) {
      return c.json({ error: "Faltan datos de la transacción" }, 400);
    }

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const transactionData = {
      id: transactionId,
      userId: user.id,
      userEmail: user.email,
      items,
      total,
      shippingInfo,
      paymentInfo: {
        method: paymentInfo.method,
        // No guardamos datos sensibles de tarjeta
      },
      transactionType,
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    await kv.set(`transaction:${transactionId}`, transactionData);

    // Also add to user's transaction list
    const userTransactionsKey = `user_transactions:${user.id}`;
    const existingTransactions = await kv.get(userTransactionsKey) || [];
    existingTransactions.push(transactionId);
    await kv.set(userTransactionsKey, existingTransactions);

    return c.json({ 
      success: true, 
      transactionId,
      transaction: transactionData
    });
  } catch (error) {
    console.log('Error creating transaction:', error);
    return c.json({ error: "Error al crear la transacción" }, 500);
  }
});

// Create contract endpoint
app.post("/make-server-92179ba9/contracts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log('Authorization error while creating contract:', authError);
      return c.json({ error: "No autorizado" }, 401);
    }

    const body = await c.req.json();
    const { 
      contractId,
      items, 
      userInfo,
      total,
      transactionId,
      contractContent
    } = body;

    if (!contractId || !items || !total) {
      return c.json({ error: "Faltan datos del contrato" }, 400);
    }

    const contractData = {
      id: contractId,
      userId: user.id,
      transactionId,
      items,
      userInfo,
      total,
      contractContent,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    await kv.set(`contract:${contractId}`, contractData);

    // Also add to user's contracts list
    const userContractsKey = `user_contracts:${user.id}`;
    const existingContracts = await kv.get(userContractsKey) || [];
    existingContracts.push(contractId);
    await kv.set(userContractsKey, existingContracts);

    return c.json({ 
      success: true, 
      contractId,
      contract: contractData
    });
  } catch (error) {
    console.log('Error creating contract:', error);
    return c.json({ error: "Error al crear el contrato" }, 500);
  }
});

// Get user transactions
app.get("/make-server-92179ba9/user/transactions", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const userTransactionsKey = `user_transactions:${user.id}`;
    const transactionIds = await kv.get(userTransactionsKey) || [];
    
    const transactions = [];
    for (const txnId of transactionIds) {
      const txnData = await kv.get(`transaction:${txnId}`);
      if (txnData) {
        transactions.push(txnData);
      }
    }

    return c.json({ 
      success: true, 
      transactions 
    });
  } catch (error) {
    console.log('Error fetching user transactions:', error);
    return c.json({ error: "Error al obtener transacciones" }, 500);
  }
});

// Get user contracts
app.get("/make-server-92179ba9/user/contracts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const userContractsKey = `user_contracts:${user.id}`;
    const contractIds = await kv.get(userContractsKey) || [];
    
    const contracts = [];
    for (const contractId of contractIds) {
      const contractData = await kv.get(`contract:${contractId}`);
      if (contractData) {
        contracts.push(contractData);
      }
    }

    return c.json({ 
      success: true, 
      contracts 
    });
  } catch (error) {
    console.log('Error fetching user contracts:', error);
    return c.json({ error: "Error al obtener contratos" }, 500);
  }
});

Deno.serve(app.fetch);