
// at start send userCredentials as req.body to what is passed in req for login
export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START",
})


// when login success happens send in payload entire user that comes up after successfull login 

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
})


// when login failure happens user not found then payload will be error

export const LoginFailure = (error)=>({
    type:"LOGIN_FAILURE",
    payload:error

})


export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId,
})

export const Unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId,
})
export const Logout = (userId)=>({
    type:"LOGOUT",
    payload:userId,
})
