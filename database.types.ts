export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      age: {
        Row: {
          age_category: string | null
          id: number
        }
        Insert: {
          age_category?: string | null
          id?: number
        }
        Update: {
          age_category?: string | null
          id?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_name: string
          id: number
        }
        Insert: {
          category_name: string
          id: number
        }
        Update: {
          category_name?: string
          id?: number
        }
        Relationships: []
      }
      conditions: {
        Row: {
          condition: string | null
          description: string | null
          id: number
        }
        Insert: {
          condition?: string | null
          description?: string | null
          id?: number
        }
        Update: {
          condition?: string | null
          description?: string | null
          id?: number
        }
        Relationships: []
      }
      item_categories: {
        Row: {
          id: number
          name: string | null
          sub_category_id: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sub_category_id?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sub_category_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "item_categories_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      items: {
        Row: {
          age_category: number | null
          brand: string | null
          category_id: number | null
          collection: boolean | null
          condition: number | null
          delivery: boolean | null
          description: string | null
          image_id: string | null
          image_path: string | null
          item_id: number
          name: string
          price: number
          seller_id: string | null
          sold: boolean
        }
        Insert: {
          age_category?: number | null
          brand?: string | null
          category_id?: number | null
          collection?: boolean | null
          condition?: number | null
          delivery?: boolean | null
          description?: string | null
          image_id?: string | null
          image_path?: string | null
          item_id?: number
          name: string
          price: number
          seller_id?: string | null
          sold?: boolean
        }
        Update: {
          age_category?: number | null
          brand?: string | null
          category_id?: number | null
          collection?: boolean | null
          condition?: number | null
          delivery?: boolean | null
          description?: string | null
          image_id?: string | null
          image_path?: string | null
          item_id?: number
          name?: string
          price?: number
          seller_id?: string | null
          sold?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "items_age_category_fkey"
            columns: ["age_category"]
            isOneToOne: false
            referencedRelation: "age"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_condition_fkey"
            columns: ["condition"]
            isOneToOne: false
            referencedRelation: "conditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          item_ids: number[] | null
          review_id: number
          review_score: number | null
          seller_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          item_ids?: number[] | null
          review_id?: number
          review_score?: number | null
          seller_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          item_ids?: number[] | null
          review_id?: number
          review_score?: number | null
          seller_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sub_categories: {
        Row: {
          category_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          category_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          category_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          bio: string | null
          favourite_items: number[] | null
          first_name: string | null
          id: string
          image_path: string | null
          items_for_sale: number[] | null
          last_name: string | null
          passport_number: string | null
          profile_picture: string | null
          purchase_history: number[] | null
          sale_history: number[] | null
          verified_parent: boolean | null
        }
        Insert: {
          bio?: string | null
          favourite_items?: number[] | null
          first_name?: string | null
          id: string
          image_path?: string | null
          items_for_sale?: number[] | null
          last_name?: string | null
          passport_number?: string | null
          profile_picture?: string | null
          purchase_history?: number[] | null
          sale_history?: number[] | null
          verified_parent?: boolean | null
        }
        Update: {
          bio?: string | null
          favourite_items?: number[] | null
          first_name?: string | null
          id?: string
          image_path?: string | null
          items_for_sale?: number[] | null
          last_name?: string | null
          passport_number?: string | null
          profile_picture?: string | null
          purchase_history?: number[] | null
          sale_history?: number[] | null
          verified_parent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_profile_picture_fkey"
            columns: ["profile_picture"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
