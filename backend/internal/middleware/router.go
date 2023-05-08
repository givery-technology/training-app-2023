package middleware

import (
	"github.com/gin-gonic/gin"
	"myapp/internal/controllers"
)

func SetupRoutes(app *gin.Engine) {
	app.GET("/", func(ctx *gin.Context) {
		ctx.String(200, "It works")
	})
	app.GET("/hello", controllers.HelloWorld)
	app.GET("/posts", controllers.ListPosts)
	app.GET("/posts/:id", controllers.GetPost)
	app.POST("/posts", controllers.CreatePost)
	app.PUT("/posts/:id", controllers.UpdatePost)
	app.DELETE("/posts/:id", controllers.DeletePost)
	app.POST("/comments", controllers.CreateComment)
	app.PUT("/comments/:id", controllers.UpdateComment)
	app.DELETE("/comments/:id", controllers.DeleteComment)
	app.POST("/signin", controllers.SignIn)
	app.POST("/signout", controllers.SignOut)
	app.GET("/user", controllers.GetSessionUser)
}
