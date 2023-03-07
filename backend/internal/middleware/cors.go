package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	myConfig "myapp/internal/config"
)

func Cors() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{myConfig.CorsAllowOrigin}
	config.AllowCredentials = true
	return cors.New(config)
}
