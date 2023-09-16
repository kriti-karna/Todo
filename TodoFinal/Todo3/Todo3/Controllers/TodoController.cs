using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data;
using Todo3.Models;

namespace Todo3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TodoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /*
         * Status Note:
         * 1 - Initial | Incomplete
         * 2 - Completed
         * 3 - Expired
         * 0 - Deleted
         */

        [HttpGet("GetTodo")]
        public JsonResult GetTodo(int? st)
        {
            string rawQuery = "select * from dbo.todo_tbl2 where status != 0";

            if(st.HasValue)
            {
                rawQuery += " and status = " + st;
            }
            //Return all todo except for deleted ones

            DataTable table = new DataTable();
            //Connection string:
            string dataSource = _configuration.GetConnectionString("TodoAppCon");

            SqlDataReader reader;

            using(SqlConnection conn = new SqlConnection(dataSource))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand(rawQuery, conn))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    conn.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost("AddNewTodo")]
        public JsonResult AddNewTodo([FromBody] TodoTbl todo)
        {
            try
            {
                if(todo.todo_content.Length > 100)
                {
                    todo.todo_content = todo.todo_content.Substring(0, 100);
                }
                string rawQuery = "insert into dbo.todo_tbl2 values ('" + todo.todo_date + "', " +
            "null, N'" + todo.todo_content + "', 1)";

                DataTable table = new DataTable();
                //Connection string:
                string dataSource = _configuration.GetConnectionString("TodoAppCon");

                SqlDataReader reader;

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        reader = cmd.ExecuteReader();
                        table.Load(reader);

                        reader.Close();
                        conn.Close();
                    }
                }

                return new JsonResult("success");
            }
            catch
            {
                return new JsonResult("error");
            }
        }

        [HttpPost("EditTodo")]
        public JsonResult EditTodo(int id, [FromBody] TodoTbl todo)
        {
            try
            {
                if(id == 0)
                {
                    throw new Exception();
                }
                if (todo.todo_content.Length > 100)
                {
                    todo.todo_content = todo.todo_content.Substring(0, 100);
                }
                string rawQuery = @"update dbo.todo_tbl2 set todo_date = '" +
                    todo.todo_date + @"', todo_content = N'" + todo.todo_content + @"'
                where id = " + id;

                DataTable table = new DataTable();
                //Connection string:
                string dataSource = _configuration.GetConnectionString("TodoAppCon");

                SqlDataReader reader;

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        reader = cmd.ExecuteReader();
                        table.Load(reader);

                        reader.Close();
                        conn.Close();
                    }
                }

                return new JsonResult("success");
            }
            catch
            {
                return new JsonResult("error");
            }
        }

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

                if(status > 3 || status < 0)
                {
                    //status cannot be anything other than 0, 1, 2, 3
                    throw new Exception();
                }
                //2021-01-01 05:30:00.000
                string today = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                string rawQuery = "";

                if(status == 2)
                {
                    rawQuery = @"UPDATE dbo.todo_tbl2 SET done_date = '" + today +
                        @"', status = 2 where id = " + id;
                }
                else
                {
                    rawQuery = @"update dbo.todo_tbl2 set status = " +
                    status + @" where id = " + id;
                }

                

                DataTable table = new DataTable();
                //Connection string:
                string dataSource = _configuration.GetConnectionString("TodoAppCon");

                SqlDataReader reader;

                using (SqlConnection conn = new SqlConnection(dataSource))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(rawQuery, conn))
                    {
                        reader = cmd.ExecuteReader();
                        table.Load(reader);

                        reader.Close();
                        conn.Close();
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
