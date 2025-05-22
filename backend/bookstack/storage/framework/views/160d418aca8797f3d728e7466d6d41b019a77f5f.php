<a href="<?php echo e($entity->getUrl()); ?>" class="grid-card"
   data-entity-type="<?php echo e($entity->getType()); ?>" data-entity-id="<?php echo e($entity->id); ?>">
    <div class="bg-<?php echo e($entity->getType()); ?> featured-image-container-wrap">
        <div class="featured-image-container" <?php if($entity->cover): ?> style="background-image: url('<?php echo e($entity->getBookCover()); ?>')"<?php endif; ?>>
        </div>
        <?php echo icon($entity->getType()); ?>
    </div>
    <div class="grid-card-content">
        <h2 class="text-limit-lines-2"><?php echo e($entity->name); ?></h2>
        <p class="text-muted"><?php echo e($entity->getExcerpt(130)); ?></p>
    </div>
    <div class="grid-card-footer text-muted ">
        <p><?php echo icon('star'); ?><span title="<?php echo e($entity->created_at->toDayDateTimeString()); ?>"><?php echo e(trans('entities.meta_created', ['timeLength' => $entity->created_at->diffForHumans()])); ?></span></p>
        <p><?php echo icon('edit'); ?><span title="<?php echo e($entity->updated_at->toDayDateTimeString()); ?>"><?php echo e(trans('entities.meta_updated', ['timeLength' => $entity->updated_at->diffForHumans()])); ?></span></p>
    </div>
</a><?php /**PATH /var/www/bookstack/resources/views/entities/grid-item.blade.php ENDPATH**/ ?>