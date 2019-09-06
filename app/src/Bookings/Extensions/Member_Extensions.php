<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 13:21
 */

namespace Bookings\Extensions {

    use Bookings\Models\Company;
    use SilverStripe\ORM\DataExtension;

    /**
     * Class Member_Extensions
     * @package Bookings\Extensions
     */
    class Member_Extensions extends DataExtension {

        private static $belongs_many_many = [
            'Company' => Company::class
        ];

        public function updateValidator ($validator){
            $validator->addRequiredField('Surname');
        }
    }
}