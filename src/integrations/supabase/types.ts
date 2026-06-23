export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          slug: string
          name: string
          blurb: string
          image: string
          tint: string
          sort_order: number
          created_at: string
        }
        Insert: {
          slug: string
          name: string
          blurb: string
          image: string
          tint: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          slug?: string
          name?: string
          blurb?: string
          image?: string
          tint?: string
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          category_slug: string
          qty: string
          mrp: number
          discount: number
          image: string
          stock: number
          bestseller: boolean
          description: string
          highlights: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          slug: string
          name: string
          category_slug: string
          qty: string
          mrp: number
          discount?: number
          image: string
          stock?: number
          bestseller?: boolean
          description: string
          highlights?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          category_slug?: string
          qty?: string
          mrp?: number
          discount?: number
          image?: string
          stock?: number
          bestseller?: boolean
          description?: string
          highlights?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gift_boxes: {
        Row: {
          id: string
          number: number
          name: string
          tagline: string
          price: number
          mrp: number
          badges: string[]
          image: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          number: number
          name: string
          tagline: string
          price: number
          mrp: number
          badges?: string[]
          image?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          number?: number
          name?: string
          tagline?: string
          price?: number
          mrp?: number
          badges?: string[]
          image?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          blurb: string
          monthly: number
          includes: string[]
          badge: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          blurb: string
          monthly: number
          includes?: string[]
          badge?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          blurb?: string
          monthly?: number
          includes?: string[]
          badge?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      mix_ingredients: {
        Row: {
          id: string
          name: string
          price_per_100g: number
          image: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id: string
          name: string
          price_per_100g: number
          image: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price_per_100g?: number
          image?: string
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          type: string
          full_name: string
          phone: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          pincode: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type?: string
          full_name: string
          phone: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          pincode: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          full_name?: string
          phone?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          pincode?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string | null
          gift_box_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id?: string | null
          gift_box_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string | null
          gift_box_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          status: Database["public"]["Enums"]["order_status"]
          shipping_name: string
          shipping_phone: string
          shipping_address_line1: string
          shipping_address_line2: string | null
          shipping_city: string
          shipping_state: string
          shipping_pincode: string
          subtotal: number
          shipping_cost: number
          discount_amount: number
          tax_amount: number
          total_amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"]
          payment_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
          confirmed_at: string | null
          shipped_at: string | null
          delivered_at: string | null
        }
        Insert: {
          id?: string
          order_number?: string
          user_id: string
          status?: Database["public"]["Enums"]["order_status"]
          shipping_name: string
          shipping_phone: string
          shipping_address_line1: string
          shipping_address_line2?: string | null
          shipping_city: string
          shipping_state: string
          shipping_pincode: string
          subtotal: number
          shipping_cost?: number
          discount_amount?: number
          tax_amount?: number
          total_amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          shipping_name?: string
          shipping_phone?: string
          shipping_address_line1?: string
          shipping_address_line2?: string | null
          shipping_city?: string
          shipping_state?: string
          shipping_pincode?: string
          subtotal?: number
          shipping_cost?: number
          discount_amount?: number
          tax_amount?: number
          total_amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          gift_box_id: string | null
          custom_mix_id: string | null
          item_name: string
          item_type: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          gift_box_id?: string | null
          custom_mix_id?: string | null
          item_name: string
          item_type: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          gift_box_id?: string | null
          custom_mix_id?: string | null
          item_name?: string
          item_type?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          start_date: string
          next_billing_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: string
          start_date?: string
          next_billing_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          start_date?: string
          next_billing_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          id: string
          code: string
          discount_type: string
          discount_value: number
          min_order_amount: number | null
          max_uses: number | null
          used_count: number
          valid_from: string
          valid_until: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: string
          discount_value: number
          min_order_amount?: number | null
          max_uses?: number | null
          used_count?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: string
          discount_value?: number
          min_order_amount?: number | null
          max_uses?: number | null
          used_count?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      corporate_inquiries: {
        Row: {
          id: string
          company_name: string
          contact_person: string
          email: string
          phone: string
          quantity_range: string
          requirements: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_person: string
          email: string
          phone: string
          quantity_range: string
          requirements?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          contact_person?: string
          email?: string
          phone?: string
          quantity_range?: string
          requirements?: string | null
          status?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      offer_price: {
        Args: {
          mrp: number
          discount_pct: number
        }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "corporate" | "customer"
      order_status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
      payment_status: "pending" | "processing" | "completed" | "failed" | "refunded"
      payment_method: "razorpay" | "upi" | "cod" | "bank_transfer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "corporate", "customer"],
      order_status: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"],
      payment_status: ["pending", "processing", "completed", "failed", "refunded"],
      payment_method: ["razorpay", "upi", "cod", "bank_transfer"],
    },
  },
} as const
