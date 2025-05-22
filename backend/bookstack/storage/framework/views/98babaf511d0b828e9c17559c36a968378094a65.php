
<?php $isOpen = setting()->getForCurrentUser('section_expansion#'. $key); ?>
<button type="button" expand-toggle="<?php echo e($target); ?>"
   expand-toggle-update-endpoint="<?php echo e(url('/settings/users/'. user()->id .'/update-expansion-preference/' . $key)); ?>"
   expand-toggle-is-open="<?php echo e($isOpen ? 'yes' : 'no'); ?>"
   class="icon-list-item <?php echo e($classes ?? ''); ?>">
    <span><?php echo icon('expand-text'); ?></span>
    <span><?php echo e(trans('common.toggle_details')); ?></span>
</button>
<?php if($isOpen): ?>
    <?php $__env->startPush('head'); ?>
        <style>
            <?php echo e($target); ?> {display: block;}
        </style>
    <?php $__env->stopPush(); ?>
<?php endif; ?><?php /**PATH /var/www/bookstack/resources/views/home/parts/expand-toggle.blade.php ENDPATH**/ ?>