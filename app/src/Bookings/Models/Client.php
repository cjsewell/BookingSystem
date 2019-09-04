<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 15:30
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;

    /**
     * Class Client
     * @package Bookings\Models
     * @property string $Name
     * @property string $Email
     * @property string $Phone
     * @property string $Mobile
     * @property string $Address
     */
    class Client extends DataObject {
        private static $table_name = "Client";
        private static $singular_name = "Client";
        private static $plurarl_name = "Clients";

        private static $db = [
            'Name' => 'Varchar(64)',
            'Email' => 'Varchar(256)',
            'Phone' => 'Varchar(64)',
            'Mobile' => 'Varchar(64)',
            'Address' => 'Text',
        ];

        private static $has_one = [
            'Company' => Company::class
        ];

        private static $sumamry_fields = [
          'Name',
          'Email',
          'Phone',
          'Mobile',
          'Address'
        ];
    }
}