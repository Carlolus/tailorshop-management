<form action="<?php echo e(url('/settings/users/toggle-dark-mode')); ?>" method="post">
    <?php echo e(csrf_field()); ?>

    <?php echo e(method_field('patch')); ?>

    <?php if(setting()->getForCurrentUser('dark-mode-enabled')): ?>
        <button class="<?php echo e($classes ?? ''); ?>"><span><?php echo icon('light-mode'); ?></span><span><?php echo e(trans('common.light_mode')); ?></span></button>
    <?php else: ?>
        <button class="<?php echo e($classes ?? ''); ?>"><span><?php echo icon('dark-mode'); ?></span><span><?php echo e(trans('common.dark_mode')); ?></span></button>
    <?php endif; ?>
</form><?php /**PATH /var/www/bookstack/resources/views/common/dark-mode-toggle.blade.php ENDPATH**/ ?>