DECLARE @table_name NVARCHAR(MAX) = 'your_table';
DECLARE @column_name NVARCHAR(MAX);
DECLARE @data_type NVARCHAR(MAX);
DECLARE @sql NVARCHAR(MAX) = '';

DECLARE column_cursor CURSOR FOR
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = @table_name;

OPEN column_cursor;
FETCH NEXT FROM column_cursor INTO @column_name, @data_type;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- If varchar/nvarchar/char/nchar/text: check for ''
    IF @data_type IN ('varchar', 'nvarchar', 'char', 'nchar', 'text')
    BEGIN
        SET @sql = @sql + '
        SELECT 
            ''' + @column_name + ''' AS column_name,
            SUM(CASE WHEN [' + @column_name + '] IS NULL THEN 1 ELSE 0 END) AS null_count,
            SUM(CASE WHEN [' + @column_name + '] = '''' THEN 1 ELSE 0 END) AS empty_count,
            SUM(CASE WHEN [' + @column_name + '] IS NOT NULL AND [' + @column_name + '] <> '''' THEN 1 ELSE 0 END) AS non_empty_count
        FROM [' + @table_name + ']
        UNION ALL
        ';
    END
    ELSE
    BEGIN
        -- Else (numeric/date): only check NULL and NOT NULL
        SET @sql = @sql + '
        SELECT 
            ''' + @column_name + ''' AS column_name,
            SUM(CASE WHEN [' + @column_name + '] IS NULL THEN 1 ELSE 0 END) AS null_count,
            NULL AS empty_count,
            SUM(CASE WHEN [' + @column_name + '] IS NOT NULL THEN 1 ELSE 0 END) AS non_empty_count
        FROM [' + @table_name + ']
        UNION ALL
        ';
    END

    FETCH NEXT FROM column_cursor INTO @column_name, @data_type;
END

CLOSE column_cursor;
DEALLOCATE column_cursor;

-- Remove last UNION ALL
SET @sql = LEFT(@sql, LEN(@sql) - LEN('UNION ALL'));

-- Show the SQL
PRINT @sql;

-- Run it if you want
-- EXEC sp_executesql @sql;
