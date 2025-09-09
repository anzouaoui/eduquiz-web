export interface Room {
  id: string;
  title: string;
  isPublic: boolean;
  code: string;
  createdAt: string;
  createdBy: string;
}

export interface CreateRoomData {
  title: string;
  isPublic: boolean;
}

export async function createRoom(data: CreateRoomData): Promise<Room> {
  // TODO: Replace with actual API call to your backend
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create room');
  }

  return response.json();
}
