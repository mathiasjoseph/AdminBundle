<?php
/**
 * Created by PhpStorm.
 * User: miky
 * Date: 17/04/17
 * Time: 17:29
 */

namespace Miky\Bundle\AdminBundle\Menu;


use Knp\Menu\ItemInterface;
use Miky\Bundle\MenuBundle\Builder\AbstractMenuBuilder;
use Miky\Bundle\MenuBundle\Event\MenuBuilderEvent;

final class AdminMenuBuilder extends AbstractMenuBuilder
{
    const EVENT_NAME = 'miky.menu.admin.main';

    /**
     * @return ItemInterface
     */
    public function createMenu()
    {
        $menu = $this->factory->createItem('root');

        $this->eventDispatcher->dispatch(self::EVENT_NAME, new MenuBuilderEvent($this->factory, $menu));
        $menu
            ->addChild('directory')
            ->setLabel('Annuaires')
            ->setLabelAttribute('icon', 'sitemap')
        ;

        $menu
            ->addChild('website')
            ->setLabel('Sites web')
            ->setLabelAttribute('icon', 'mouse-pointer')
        ;

        $menu
            ->addChild('calendar')
            ->setLabel('Agenda')
            ->setLabelAttribute('icon', 'calendar-check-o')
        ;

        $sub = $menu
            ->addChild('Revenue')
            ->setLabel('Revenue')
            ->setLabelAttribute('icon', 'money')
        ;

        $subsub = $sub
            ->addChild('Revenue')
            ->setLabel('Revenue')
            ->setLabelAttribute('icon', 'money')
        ;

        $subsubsub = $subsub
            ->addChild('Revenue')
            ->setLabel('Revenue')
            ->setLabelAttribute('icon', 'money')
        ;

// @TODO
//        $schemas = $this->settingsManager->getSchemaRegistry()->all();
//        $settingsMenu = $menu
//            ->addChild('settings')
//            ->setLabel('Paramètres')
//            ->setLabelAttribute('icon', 'calendar-check-o')
//        ;
//        foreach ($schemas as $key => $value){
//            $settingsMenu
//                ->addChild("settings_".$key, ['route' => 'miky_admin_settings_edit', 'routeParameters' => array('schema' => $key)])
//                ->setLabel("miky.ui.".$key)
//                ->setLabelAttribute('icon', 'calendar-check-o')
//            ;
//        }
        return $menu;
    }


}
