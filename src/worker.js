import { router } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      return await router(request, env, ctx);
    } catch (error) {
      console.error(error);

      // stack은 내부 경로를 노출하므로 DEBUG일 때만 내려보낸다.
      const body = {
        success: false,
        message: "Internal Server Error"
      };

      if (env.DEBUG === "true") {
        body.error = error.message;
        body.stack = error.stack;
      }

      return new Response(
        JSON.stringify(body, null, 2),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};
