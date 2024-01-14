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

-- CreateTable
CREATE TABLE [dbo].[Acqua] (
    [idDispositivo] INT NOT NULL,
    CONSTRAINT [Acqua_idDispositivo_key] UNIQUE NONCLUSTERED ([idDispositivo])
);

-- CreateTable
CREATE TABLE [dbo].[MisurazioniAcqua] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pH] FLOAT(53) NOT NULL,
    [metalli] FLOAT(53) NOT NULL,
    [dispId] INT NOT NULL,
    CONSTRAINT [MisurazioniAcqua_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Aria] (
    [idDispositivo] INT NOT NULL,
    CONSTRAINT [Aria_idDispositivo_key] UNIQUE NONCLUSTERED ([idDispositivo])
);

-- CreateTable
CREATE TABLE [dbo].[MisurazioniAria] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cov] FLOAT(53) NOT NULL,
    [gas] FLOAT(53) NOT NULL,
    [dispId] INT NOT NULL,
    CONSTRAINT [MisurazioniAria_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Acqua] ADD CONSTRAINT [Acqua_idDispositivo_fkey] FOREIGN KEY ([idDispositivo]) REFERENCES [dbo].[Dispositivo]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MisurazioniAcqua] ADD CONSTRAINT [MisurazioniAcqua_dispId_fkey] FOREIGN KEY ([dispId]) REFERENCES [dbo].[Acqua]([idDispositivo]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Aria] ADD CONSTRAINT [Aria_idDispositivo_fkey] FOREIGN KEY ([idDispositivo]) REFERENCES [dbo].[Dispositivo]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MisurazioniAria] ADD CONSTRAINT [MisurazioniAria_dispId_fkey] FOREIGN KEY ([dispId]) REFERENCES [dbo].[Aria]([idDispositivo]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
