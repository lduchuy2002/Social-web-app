# Social-web-app
Huy <3 Pupu
#######################################################################################

https://www.npmjs.com/package/notistack-next

#######################################################################################

🍩 ⋆ 🍡  🎀  𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲  🎀  🍡 ⋆ 🍩

create user (id int not null primary key auto_increment, email nvarchar(50) not null, password nvarchar(200) not null, username nvarchar(50) not null, birthday nvarchar(50) not null , gender boolean default 0, isEnable boolean default 0);

#######################################################################################

🍩 ⋆ 🍡  🎀 𝗔𝗣𝗜  🎀  🍡 ⋆ 🍩

POST http://localhost:8080/api/sign-up 

Request {
  email: string,
  username: string,
  password: string,
  gender: 0 | 1,
  birthday: string,
}

Reponse {
  type: "SUCCESS" | "ERROR" | "WARNING",
  data: null,
  message: string
}


POST http://localhost:8080/api/sign-in

Request {
  email: string,
  password: string
}

Response
- Header {
Authorization: Bearer eyasakjsagasou41po;1m
}

-Body {
  data: {
      id: number,
      email: string,
      username: string,
      password: string,
      gender: 0 | 1,
      birthday: string,
  },
  type: 'SUCESSS' | 'ERROR' | 'WARNING',
  message: string
}
