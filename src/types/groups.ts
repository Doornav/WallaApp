// Define the Group interface
interface Group {
    id: string;
    name: string;
    description: string | null;
    is_private: boolean;
    created_at: string; // ISO date string
    location: {
        type: string; // e.g. 'Point'
        coordinates: [number, number]; // [longitude, latitude]
    } | null;
    latitude?: number; // If storing directly as columns
    longitude?: number; // If storing directly as columns
    address: string | null;
    zip_code: string | null;
    max_members: number;
    current_member_count: number;
    // Add any additional fields your groups table might have
    created_by?: string; // UUID of the creator
    image_url?: string | null; // Group profile image
}

// You can also create related types for group membership
interface GroupMember {
    id: string;
    group_id: string;
    user_id: string;
    role: 'admin' | 'member';
    joined_at: string; // ISO date string
    status: 'active' | 'pending' | 'blocked';
}

// For group invites
interface GroupInvite {
    id: string;
    group_id: string;
    invited_by: string;
    email: string;
    token: string;
    created_at: string;
    expires_at: string;
}

// If you need a simpler type for certain UI components
interface GroupSummary {
    id: string;
    name: string;
    member_count: number;
    latitude: number;
    longitude: number;
    distance?: number; // Distance from user in km or miles
}

export type { Group, GroupMember, GroupInvite, GroupSummary };