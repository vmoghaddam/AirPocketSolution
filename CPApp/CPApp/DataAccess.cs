using System;
using System.Collections.Generic;
using System.Text;
 
using System.Threading.Tasks;
using SQLite;


namespace CPApp
{
    public class Database
    {
        readonly SQLiteAsyncConnection _database;

        public Database(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.CreateTableAsync<Model.LoggedUser>().Wait();
            _database.CreateTableAsync<Model.UrlHistory>().Wait();
             
        }

        public Task<List<Model.LoggedUser>> GetLoggedUsersAsync()
        {
            return _database.Table<Model.LoggedUser>().ToListAsync();
        }
        public async Task< Model.LoggedUser > GetLoggedUserAsync()
        {
            
            return await _database.Table<Model.LoggedUser>().FirstOrDefaultAsync();
        }
        public   Task<Model.LoggedUser> GetLoggedUser()
        {

            return   _database.Table<Model.LoggedUser>().FirstOrDefaultAsync();
        }


        public Task<int> SaveLoggedUserAsync(Model.LoggedUser loggedUser)
        {
            return _database.InsertAsync(loggedUser);
        }

        public async Task<int> DeleteLoggedUserAsync()
        {
            var data = await GetLoggedUserAsync();
            return await _database.Table<Model.LoggedUser>().DeleteAsync(q => q.ID == data.ID);
        }

        public Task<int> SaveHistoryAsync(Model.UrlHistory history)
        {
            return _database.InsertAsync(history);
        }
        public   Task<Model.UrlHistory> GetLastHistory ()
        {
            try
            {
                
                return   _database.Table<Model.UrlHistory>().OrderByDescending(q=>q.date).FirstOrDefaultAsync();
            }
            catch(Exception ex)
            {
                return null;
            }
           
        }



    }
}
