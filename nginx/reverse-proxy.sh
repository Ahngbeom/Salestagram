set -e

ME=$(basename $0)
DEFAULT_CONF_FILE="etc/nginx/conf.d/default.conf"

# if [ ! -f "/proc/net/if_inet6" ]; then
#     entrypoint_log "$ME: info: ipv6 not available"
#     exit 0
# fi

# if [ ! -f "/$DEFAULT_CONF_FILE" ]; then
#     entrypoint_log "$ME: info: /$DEFAULT_CONF_FILE is not a file or does not exist"
#     exit 0
# fi

sed '/server {/i\upstream reverse_proxy {\n\tserver nodejs-express;\n\tserver redis;\n}\n' nginx/default.conf

sed -e '/root/d' -e '/index/d' -e '/location {/a\\tproxy_pass reverse_proxy' nginx/default.conf

exit 0
