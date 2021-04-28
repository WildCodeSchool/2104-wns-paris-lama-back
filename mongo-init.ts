db.createUser({
  roles: [
    {
      role: 'readWrite',
      db: 'lamadb',
    },
  ],
})
