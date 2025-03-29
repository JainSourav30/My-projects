
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hi from inside cloudflare worker');
	},
} satisfies ExportedHandler<Env>;


