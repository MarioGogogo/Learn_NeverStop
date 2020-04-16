# 阿里云http升级https



> HTTP协议以明文方式发送内容，不提供任何方式的数据加密。为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。



## 申请证书

![](http://book.52react.cn/20200313231641.png)



然后在SSL证书中下载申请来的证书

有2个：

![](http://book.52react.cn/20200313231806.png)



### 配置阿里云nginx

![](http://book.52react.cn/20200313232143.png)

我的配置文件在`/ect/nginx`，现在把刚才的两个证书文件复制过来，待会直接配置使用就行了。nginx的配置文件是`nginx.conf`，里面的配置内容有以下



```json
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    server {
        listen       80;
        server_name  www.xxx.cn;
		# 在这里，我做了https全加密处理，在访问http的时候自动跳转到https
	   rewrite ^(.*) https://$host$1 permanent;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /home/chan/www;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server 配置https就看这里啦
    #
     server {
        listen 443;
        server_name www.xxx.cn;
        ssl on;
        #定义服务器的默认网站根目录位置
        root  /home/chan/www;
        index index.html index.htm;
        ssl_certificate      cert/ssl.pem;
        ssl_certificate_key  cert/ssl.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        #location / {
            #index index.html index.htm;
           # proxy_pass http://127.0.0.1:8081;
        #}

        error_page  404              /404.html;
    }

}
```



然后执行

```js
sudo nginx -s reload
```



运行浏览器

![](http://book.52react.cn/20200313232516.png)