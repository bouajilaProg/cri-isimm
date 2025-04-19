db = db.getSiblingDB("cri-v3");

db.createUser({
  user: "root",
  pwd: "bouajilaMongo",
  roles: [
    { role: "readWrite", db: "cri-v3" }
  ]
});

