# Social-web-app
Huy <3 Pupu
#######################################################################################

https://www.npmjs.com/package/notistack-next

#######################################################################################
http://localhost:8080/api/sign-up

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


http://localhost:8080/api/sign-in

Request {
  email: string,
  password: string
}

Response
- Header {
Authorization: Bearer eyasakjsagasou41po;1m
}

-Body {
  id: number,
  email: string,
  username: string,
  password: string,
  gender: 0 | 1,
  birthday: string,
}
