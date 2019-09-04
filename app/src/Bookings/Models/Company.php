<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 11:12
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;
    use SilverStripe\Security\Member;

    /**
     * Class Company
     * @package Bookings
     * @property string $Name
     */
    class Company extends DataObject {
        private static $table_name = "Company";
        private static $singular_name = "Company";
        private static $plurarl_name = "Companies";

        private static $db = [
            'Name' => 'Varchar(256)'
        ];

        private static $summary_fields = [
          'Name'
        ];

        private static $has_many = [
            'Rooms' => Room::class,
            'Members' => Member::class,
            'Clients' => Client::class
        ];
    }
}