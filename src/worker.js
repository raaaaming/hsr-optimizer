import { router } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      return await router(request, env, ctx);
    } catch (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          stack: error.stack
        }, null, 2),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
    }
  }
};