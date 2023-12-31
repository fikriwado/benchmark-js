let ID = 1

async function fetchUsers(limit = 1000) {
  try {
    const response = await fetch(`http://localhost/benchmark-js-api/api.php?limit=${limit}`);
    const users = await response.json();
    return users
  } catch (error) {
    console.error(error);
  }
}

export async function buildData(count = 1000) {
  const data = []
  const users = await fetchUsers(count)
  for (let i = 0; i < count; i++)
    data.push({
      id: ID++,
      name: users[i].name,
      email: users[i].email
    })
  return data
}