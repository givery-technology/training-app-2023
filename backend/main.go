package main

import (
	"fmt"
	"myapp/internal/config"
	"myapp/internal/external"
	"myapp/internal/middleware"

	"github.com/gin-gonic/gin"
)

var accounts = gin.Accounts{
	"givery": "training",
}

func main() {
	// Initialize database
	external.SetupDB()

	// Setup webserver
	app := gin.Default()
	app.Use(middleware.Transaction())
	app.Use(middleware.Cors())
	app.Use(middleware.VerifyJwt())
	middleware.SetupRoutes(app)
	// Basic auth endpoint
	basic := app.Group(
		"/basic", gin.BasicAuth(
			accounts,
		),
	)
	basic.GET("", func(c *gin.Context) {
		c.String(200, "Basic auth psssed")
	})
	app.Run(fmt.Sprintf("%s:%d", config.HostName, config.Port))
}
