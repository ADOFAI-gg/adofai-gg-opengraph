curl --insecure -H "Authorization: Bearer $API_TOKEN" $API_ENDPOINT/apis/apps/v1/namespaces/adofai-gg/deployments/opengraph-staging \
	-X PATCH -H "Accept: application/json, */*" -H "Content-Type: application/strategic-merge-patch+json" \
	--data '{"spec":{"template":{"metadata":{"annotations":{"kubectl.kubrnetes.io/restartedAt":"'"$(date +%Y-%m-%dT%T%z)"'"}}}}}' > /dev/null
