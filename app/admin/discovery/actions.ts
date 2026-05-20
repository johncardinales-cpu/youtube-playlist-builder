'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseAdminClient } from '@/lib/supabase-server';

export async function approveDiscoveryVideo(formData: FormData) {
  const videoId = getVideoId(formData);
  if (!videoId) return;

  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  await supabase
    .from('videos')
    .update({
      approved_at: new Date().toISOString(),
      rejected_at: null,
      updated_at: new Date().toISOString()
    })
    .eq('id', videoId);

  revalidatePath('/admin/discovery');
}

export async function rejectDiscoveryVideo(formData: FormData) {
  const videoId = getVideoId(formData);
  if (!videoId) return;

  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  await supabase
    .from('videos')
    .update({
      approved_at: null,
      rejected_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', videoId);

  revalidatePath('/admin/discovery');
}

function getVideoId(formData: FormData) {
  const value = formData.get('videoId');
  return typeof value === 'string' ? value : '';
}
