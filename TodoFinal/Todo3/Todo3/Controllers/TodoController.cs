using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Todo3.Models;

namespace Todo3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private string dataSource;

        public TodoController(IConfiguration configuration)
        {
            _configuration = configuration;
            dataSource = _configuration.GetConnectionString("TodoAppCon");
        }

        /*
         * Status Note:
         * 1 - Initial | Incomplete
         * 2 - Completed
         * 3 - Expired
         * 0 - Deleted
         */

        /// <summary>
        /// 指定されたステータス フィルターに基づいて ToDo アイテムのリストを取得
        /// </summary>
        /// <param name="st">ステータスフィルター (任意).</param>
        /// <returns>Todo 項目のリストを含む JsonResult を返す</returns>

        [HttpGet("GetTodo")]
        public JsonResult GetTodo(int? st)
        {

            //Return all todo except for deleted ones
            string rawQuery = "select * from dbo.todo_tbl2 where status != 0";

            if (st.HasValue)
            {
                rawQuery += " AND status = @status";
            }

            DataTable table = new DataTable();

            using (SqlConnection conn = new SqlConnection(dataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                {
                    if (st.HasValue)
                    {
                        cmd.Parameters.AddWithValue("@status", st);
                    }
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        table.Load(reader);
                    }
                }
            }

            return new JsonResult(table);
        }

        /// <summary>
        /// 新しい TODO の追加
        /// </summary>
        /// <param name="todo">TODO アイテム</param>
        /// <returns>操作の結果を示す JsonResult を返す</returns>

        [HttpPost("AddNewTodo")]
        public JsonResult AddNewTodo([FromBody] TodoTbl todo)
        {
            try
            {
                if (todo.todo_content.Length > 100)
                {
                    todo.todo_content = todo.todo_content.Substring(0, 100);
                }
                string rawQuery = "insert into dbo.todo_tbl2 values ('@tododate', " +
                    "null, N'@todocontent', 1)";

                DataTable table = new DataTable();

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@tododate", todo.todo_date);
                        cmd.Parameters.AddWithValue("@todocontent", todo.todo_content);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            table.Load(reader);
                        }
                    }
                }

                return new JsonResult("success");
            }
            catch
            {
                return new JsonResult("error");
            }
        }

        /// <summary>
        /// TODO の変更
        /// </summary>
        /// <param name="id">TODO の ID</param>
        /// <param name="todo">変更する TODO アイテム</param>
        /// <returns>操作の結果を示す JsonResult を返す</returns>

        [HttpPost("EditTodo")]
        public JsonResult EditTodo(int id, [FromBody] TodoTbl todo)
        {
            try
            {
                if (id == 0)
                {
                    throw new Exception();
                }
                if (todo.todo_content.Length > 100)
                {
                    todo.todo_content = todo.todo_content.Substring(0, 100);
                }
                string rawQuery = @"update dbo.todo_tbl2 set todo_date = '@todotade', todo_content = N'@todocontent'
                    where id = @todoid";

                DataTable table = new DataTable();

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@tododate", todo.todo_date);
                        cmd.Parameters.AddWithValue("@todocontent", todo.todo_content);
                        cmd.Parameters.AddWithValue("@todoid", todo.id);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            table.Load(reader);
                        }
                    }
                }

                return new JsonResult("success");
            }
            catch
            {
                return new JsonResult("error");
            }
        }

        /// <summary>
        /// TODO のステータスの変更
        /// </summary>
        /// <param name="id">TODO の ID</param>
        /// <param name="status">新しいステータス</param>
        /// <returns>操作の結果を示す JsonResult を返す</returns>

        [HttpPost("ChangeStatus")]
        public JsonResult ChangeStatus(int id, int status)
        {
            try
            {
                if (id == 0)
                {
                    //throw when id is invalid
                    throw new Exception();
                }

                if (status > 3 || status < 0)
                {
                    //status cannot be anything other than 0, 1, 2, 3
                    throw new Exception();
                }
                string today = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                string rawQuery = "";

                if (status == 2)
                {
                    rawQuery = @"UPDATE dbo.todo_tbl2 SET done_date = '" + today +
                        @"', status = 2 where id = @todoid";
                }
                else
                {
                    rawQuery = @"update dbo.todo_tbl2 set status = @todostatus where id = @todoid";
                }

                DataTable table = new DataTable();

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@todoid", id);
                        cmd.Parameters.AddWithValue("@todostatus", status);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            table.Load(reader);
                        }
                    }
                }

                return new JsonResult("success");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }
    }
}
