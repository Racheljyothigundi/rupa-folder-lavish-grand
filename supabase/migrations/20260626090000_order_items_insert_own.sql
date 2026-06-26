GRANT INSERT ON public.order_items TO authenticated;

CREATE POLICY "order_items_insert_own" ON public.order_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );
