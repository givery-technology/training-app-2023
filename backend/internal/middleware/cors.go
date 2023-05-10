package middleware

import (
	"fmt"
	myConfig "myapp/internal/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	fmt.Println("CorsAllowOrigin: ", myConfig.CorsAllowOrigin)
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{myConfig.CorsAllowOrigin}
	config.AllowCredentials = true
	return cors.New(config)
}
