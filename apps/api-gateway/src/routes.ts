import { IRoute } from "./types";


export const routes: IRoute[] = [{
    url: "/api/v1/auth",
    auth: false,
    proxy: {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {"^/":"api/v1/auth/"},
        timeout:5000

    }
},{
    url: "/api/v1/users",
    auth: false,
    proxy: {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {"^/":"api/v1/users/"},
        timeout:5000

    }
}

]