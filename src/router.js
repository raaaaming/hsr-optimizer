import { json } from "./util/response.js";

const routes = {
  "/": home,

  "/api/health": health,

  "/api/builds": builds,

  "/api/parties": parties,

  "/api/cycles": cycles,

  "/api/simulate": simulate
};

export async function router(request, env, ctx) {
  const url = new URL(request.url);

  const pathname = url.pathname;

  const handler = routes[pathname];

  if (!handler) {
    return json(
      {
        success: false,
        error: "Not Found",
        path: pathname
      },
      404
    );
  }

  return handler(request, env, ctx);
}

async function home() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>HSR Optimizer</title>
<style>
body{
font-family:sans-serif;
background:#111;
color:#fff;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}
.card{
padding:30px;
background:#1d1d1d;
border-radius:12px;
text-align:center;
}
</style>
</head>

<body>

<div class="card">

<h1>HSR Optimizer</h1>

<p>Cloudflare Workers Running</p>

<p>Version 0.1.0</p>

</div>

</body>

</html>`,
    {
      headers: {
        "Content-Type": "text/html;charset=utf-8"
      }
    }
  );
}

async function health() {
  return json({
    success: true,
    status: "ok",
    version: "0.1.0",
    timestamp: Date.now()
  });
}

async function builds() {
  return json({
    success: true,
    message: "Build API Ready",
    data: []
  });
}

async function parties() {
  return json({
    success: true,
    message: "Party API Ready",
    data: []
  });
}

async function cycles() {
  return json({
    success: true,
    message: "Cycle API Ready",
    data: []
  });
}

async function simulate() {
  return json({
    success: true,
    message: "Simulation Engine Not Implemented",
    damage: 0
  });
}