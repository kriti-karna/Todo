namespace Todo3.Models
{
    public class TodoTbl
    {
        public int id { get; set; }
        public DateTime? todo_date { get; set; }
        public DateTime? done_date { get; set; }
        public string? todo_content { get; set; }
        public int status { get; set; }
    }
}
