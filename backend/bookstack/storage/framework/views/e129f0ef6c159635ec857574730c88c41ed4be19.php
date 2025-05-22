<?php
 $isFavourite = $entity->isFavourite();
?>
<form action="<?php echo e(url('/favourites/' . ($isFavourite ? 'remove' : 'add'))); ?>" method="POST">
    <?php echo e(csrf_field()); ?>

    <input type="hidden" name="type" value="<?php echo e(get_class($entity)); ?>">
    <input type="hidden" name="id" value="<?php echo e($entity->id); ?>">
    <button type="submit" class="icon-list-item text-primary">
        <span><?php echo icon($isFavourite ? 'star' : 'star-outline'); ?></span>
        <span><?php echo e($isFavourite ? trans('common.unfavourite') : trans('common.favourite')); ?></span>
    </button>
</form><?php /**PATH /var/www/bookstack/resources/views/entities/favourite-action.blade.php ENDPATH**/ ?>