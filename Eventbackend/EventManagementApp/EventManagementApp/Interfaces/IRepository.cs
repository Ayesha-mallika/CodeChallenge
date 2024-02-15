namespace EventManagementApp.Interfaces
{
    public interface IRepository<K, T>
       where T : class
    {
        T GetById(K key);
        IList<T> GetAll();
        T Add(T entity);
        T Update(T entity);
        T Delete(K key);
    }
}