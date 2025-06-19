  export async function GET(request, res) {
      // Logic to retrieve users
      const users = [{ id: 1, content: 'Alice  ahu ahdu' }, { id: 2, content: 'B jhgd asjhas dsdva sob' }];
      return Response.json(users);
    }