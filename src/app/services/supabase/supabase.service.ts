import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ANON_KEY, URL_SUPABASE } from 'src/app/secrets/supabase-token';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      URL_SUPABASE, ANON_KEY
    );
  }

  async uploadImage(file: File): Promise<string | null> {
    const filePath = `images/${Date.now()}_${file.name}`;
    
    const { data, error } = await this.supabase.storage
      .from('images') 
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    return this.getImageUrl(filePath);
  }

  getImageUrl(filePath: string): string {
    return this.supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;
  }
}
