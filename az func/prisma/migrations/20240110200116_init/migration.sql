BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Dispositivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [connectionString] NVARCHAR(1000) NOT NULL,
    [matricola] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Dispositivo_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Dispositivo_matricola_key] UNIQUE NONCLUSTERED ([matricola])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
