package middleware

import (
	"github.com/gin-gonic/gin"
	"myapp/internal/external"
)

func Transaction() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		db := external.DB.Begin()
		defer func() {
			if 400 <= ctx.Writer.Status() {
				db.Rollback()
				return
			}
			db.Commit()
		}()
		ctx.Set("db", db)
		ctx.Next()
	}
}
