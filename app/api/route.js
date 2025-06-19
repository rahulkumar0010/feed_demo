  export async function GET(request, res) {
      // Logic to retrieve users
      const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      return Response.json(users);
    }