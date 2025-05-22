


<div>
    <?php if($activity->user): ?>
    <img class="avatar" src="<?php echo e($activity->user->getAvatar(30)); ?>" alt="<?php echo e($activity->user->name); ?>">
    <?php endif; ?>
</div>

<div>
    <?php if($activity->user): ?>
        <a href="<?php echo e($activity->user->getProfileUrl()); ?>"><?php echo e($activity->user->name); ?></a>
    <?php else: ?>
        <?php echo e(trans('common.deleted_user')); ?>

    <?php endif; ?>

    <?php echo e($activity->getText()); ?>


    <?php if($activity->entity && is_null($activity->entity->deleted_at)): ?>
        <a href="<?php echo e($activity->entity->getUrl()); ?>"><?php echo e($activity->entity->name); ?></a>
    <?php endif; ?>

    <?php if($activity->entity && !is_null($activity->entity->deleted_at)): ?>
        "<?php echo e($activity->entity->name); ?>"
    <?php endif; ?>

    <br>

    <span class="text-muted"><small><?php echo icon('time'); ?><?php echo e($activity->created_at->diffForHumans()); ?></small></span>
</div>
<?php /**PATH /var/www/bookstack/resources/views/common/activity-item.blade.php ENDPATH**/ ?>