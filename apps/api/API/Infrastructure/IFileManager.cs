using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace API.Infrastructure {
    public interface IFileManager {
        Task<FileUploadResult?> UploadFile(IFile file, CancellationToken cancellationToken);
    }
}
