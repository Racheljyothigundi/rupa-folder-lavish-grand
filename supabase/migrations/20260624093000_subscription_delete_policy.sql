CREATE POLICY "user_subscriptions_delete_own" ON public.user_subscriptions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
