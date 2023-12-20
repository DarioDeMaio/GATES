BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Tipologia] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tipo] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Tipologia_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Dispositivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [connectionString] NVARCHAR(1000) NOT NULL,
    [matricola] NVARCHAR(1000) NOT NULL,
    [tipologiaId] INT NOT NULL,
    CONSTRAINT [Dispositivo_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Dispositivo_matricola_key] UNIQUE NONCLUSTERED ([matricola])
);

-- AddForeignKey
ALTER TABLE [dbo].[Dispositivo] ADD CONSTRAINT [Dispositivo_tipologiaId_fkey] FOREIGN KEY ([tipologiaId]) REFERENCES [dbo].[Tipologia]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
