import { projectId, publicAnonKey } from './info';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-92179ba9`;

export async function saveToSupabase(
  endpoint: string,
  data: any,
  accessToken?: string
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken || publicAnonKey}`,
    };

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
}

export async function getFromSupabase(
  endpoint: string,
  accessToken: string
) {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
}
