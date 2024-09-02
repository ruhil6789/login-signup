import express from "express";
export const RES_MSG = {
    USER: {
        CREATED: "User Created Successfully",
        UPDATED: "User Updated Successfully",
        ALREADY: "User Already Exist",
        NOT_EXIST: "User Does Not Exist"
    },
    NO_DATA: "No data found",
    BADREQUEST: "Bad Request",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    TXN: {
        GET_ERROR: "Error while fetching token transactions list",
        GET_SUCCESS: "Transaction list fetched successfully",
        TOKEN_TOTAL_ERROR: "Unable to fetch details, Something went wrong",
    },
    EMAIL: {
        SUCCESS: "Email send successfully, will get in touch soon.",
        SUBSCRIBE_SUCCESS: "Thank you for subscribing.",
        ERROR: "Something went wrong, please try again later",
    },
  
    REGISTER: {
        SUCCESS: "User Registered Successfully, Please Verify your email now",
        AGAINSUCCESS:
            "Please Verify your email using the link send to your registered email",
        NOUSER: "No user found",
        ALREADY: "Already Registered",
        ALREADYEMAIL:
            "This email is already registered with another wallet, Please connect with different wallet",
        ALREADYWALLET: "Wallet Address already Registered with different email",
    },
    ADMIN: {
        SUCCESS: "Admin Registered Successfully , Please Login to continue",
        DUPLICATE: "Already Registered",
        LOGIN: "Admin login Successfully.",
    },
    LOGIN: {
        SUCCESS: "User login Successfully",
        ADMIN_SUCCESS: "User login Successfully",
        INVALIDUSER: "Invalid User",
        INVALID_EMAIL: "Email not recognised, please try another Email address",
        INVALID_WALLET:
            "Wallet Address not recognised, please try another Wallet Address",
        EMAILVERIFY: "Your Email has not been verified , Please verify your Email",
        INVALIPASSWORD: "Invalid Password",
        EMAIL_VERIFY_FIRST: "Please verify your email first",
    },
    SUCCESS_MESSAGE: "Success",

    VERIFIED: "successfully verified",
    ADMIN_VERIFIED: " Admin successfully verified",


    REQUEST_UPDATE: "Thank you for your request .",

};

export const RESPONSES = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOCONTENT: 204,
    BADREQUEST: 400,
    UN_AUTHORIZED: 401,
    INVALID_REQ: 422,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    TIMEOUT: 408,
    TOOMANYREQ: 429,
    INTERNALSERVER: 500,
    BADGATEWAYS: 502,
    SERVICEUNAVILABLE: 503,
    GATEWAYTIMEOUT: 504,
};

export class MessageUtil {
    static success<T>(response: express.Response, responseData: T) {
        return response.send(responseData);
    }

    static error<T>(response: express.Response, responseData: any) {
        return response.status(responseData["status"]).send(responseData);
    }
}
