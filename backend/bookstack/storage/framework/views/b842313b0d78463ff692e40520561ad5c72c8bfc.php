<div>
    <form action="<?php echo e(url("/settings/users/". user()->id ."/switch-${type}-view")); ?>" method="POST" class="inline">
        <?php echo csrf_field(); ?>

        <?php echo method_field('PATCH'); ?>

        <input type="hidden" value="<?php echo e($view === 'list'? 'grid' : 'list'); ?>" name="view_type">
        <?php if($view === 'list'): ?>
            <button type="submit" class="icon-list-item text-primary">
                <span class="icon"><?php echo icon('grid'); ?></span>
                <span><?php echo e(trans('common.grid_view')); ?></span>
            </button>
        <?php else: ?>
            <button type="submit" class="icon-list-item text-primary">
                <span><?php echo icon('list'); ?></span>
                <span><?php echo e(trans('common.list_view')); ?></span>
            </button>
        <?php endif; ?>
    </form>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/view-toggle.blade.php ENDPATH**/ ?>