using System.Collections.Generic;

namespace app.Tests;


public class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
{
    private readonly IEnumerator<T> _innerEnumerator;

    public TestAsyncEnumerator(IEnumerator<T> innerEnumerator)
    {
        _innerEnumerator = innerEnumerator;
    }

    public T Current => _innerEnumerator.Current;

    public async ValueTask<bool> MoveNextAsync()
    {
        return await Task.FromResult(_innerEnumerator.MoveNext());
    }

    public async ValueTask DisposeAsync()
    {
        await Task.CompletedTask;
        _innerEnumerator.Dispose();
    }
}
