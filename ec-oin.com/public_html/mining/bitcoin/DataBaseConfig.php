<?php

class DataBaseConfig
{
    public $servername;
    public $username;
    public $password;
    public $databasename;

    public function __construct()
    {

        $this->servername = 'localhost';
        $this->username = 'econnn_manee';
        $this->password = 'qwertyuiop';
        $this->databasename = 'econnn_manee';
        $this->PORT = '3306';
    }
}

?>
